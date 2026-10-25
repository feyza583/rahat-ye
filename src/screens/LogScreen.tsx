import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Chip from '../components/chip';
import PrimaryButton from '../components/PrimaryButton';
import {
  CATEGORY_OPTIONS,
  SEVERITY_LEVELS,
  SYMPTOM_OPTIONS,
  TRIGGER_TAG_OPTIONS,
} from '../constants/options';
import { postLog } from '../services/api';
import { useLogStore } from '../store/useLogStore';
import { useTheme } from '../theme/ThemeProvider';
import type {
  LogEntry,
  MealCategory,
  Severity,
  Symptom,
  TriggerTag,
} from '../types';
import { toggleInList } from '../utils/list';
import { validateMealName } from '../utils/validation';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function LogScreen() {
  const { colors } = useTheme();

  const [mealName, setMealName] = useState('');
  const [touched, setTouched] = useState(false);
  const [category, setCategory] = useState<MealCategory>('home');
  const [triggerTags, setTriggerTags] = useState<TriggerTag[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [severity, setSeverity] = useState<Severity | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [currentEntry, setCurrentEntry] = useState<LogEntry | null>(null);

  const addEntry = useLogStore((state) => state.addEntry);
  const updateSyncStatus = useLogStore((state) => state.updateSyncStatus);

  const mealNameError = validateMealName(mealName);
  const showError = touched && mealNameError !== null;
  const isLoading = submitStatus === 'loading';
  const canSave = mealNameError === null && severity !== null && !isLoading;

  const labelStyle = [styles.label, { color: colors.text }];
  const hintStyle = [styles.hint, { color: colors.textMuted }];

  const handleChangeText = (text: string) => {
    setMealName(text);
    setTouched(true);
    if (submitStatus === 'success') setSubmitStatus('idle');
  };

  const resetForm = () => {
    setMealName('');
    setTouched(false);
    setCategory('home');
    setTriggerTags([]);
    setSymptoms([]);
    setSeverity(null);
  };

  const sendEntry = async (entry: LogEntry) => {
    setSubmitStatus('loading');
    try {
      await postLog(entry);
      updateSyncStatus(entry.id, 'synced');
      setCurrentEntry(null);
      setSubmitStatus('success');
    } catch {
      updateSyncStatus(entry.id, 'failed');
      setSubmitStatus('error');
    }
  };

  const handleSave = () => {
    if (severity === null) return;

    const entry: LogEntry = {
      id: Date.now().toString(),
      mealName: mealName.trim(),
      category,
      triggerTags,
      symptoms,
      severity,
      createdAt: new Date().toISOString(),
      syncStatus: 'pending',
    };

    addEntry(entry);
    setCurrentEntry(entry);
    resetForm();
    sendEntry(entry);
  };

  const handleRetry = () => {
    if (currentEntry) sendEntry(currentEntry);
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={labelStyle}>Ne yedin?</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text,
          },
          showError && { borderColor: colors.danger },
        ]}
        placeholder="Örn: Mercimek çorbası"
        placeholderTextColor={colors.textMuted}
        value={mealName}
        onChangeText={handleChangeText}
        onBlur={() => setTouched(true)}
      />
      {showError && (
        <Text style={[styles.errorText, { color: colors.danger }]}>
          {mealNameError}
        </Text>
      )}

      <Text style={labelStyle}>Kategori</Text>
      <View style={styles.chipRow}>
        {CATEGORY_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={category === option.value}
            onPress={() => setCategory(option.value)}
          />
        ))}
      </View>

      <Text style={labelStyle}>Tetikleyici etiketler</Text>
      <View style={styles.chipRow}>
        {TRIGGER_TAG_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={triggerTags.includes(option.value)}
            onPress={() =>
              setTriggerTags((current) => toggleInList(current, option.value))
            }
          />
        ))}
      </View>

      <Text style={labelStyle}>Semptomlar</Text>
      <View style={styles.chipRow}>
        {SYMPTOM_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={symptoms.includes(option.value)}
            onPress={() =>
              setSymptoms((current) => toggleInList(current, option.value))
            }
          />
        ))}
      </View>

      <Text style={labelStyle}>Rahatsızlık şiddeti</Text>
      <Text style={hintStyle}>1 = çok hafif, 5 = çok şiddetli</Text>
      <View style={styles.chipRow}>
        {SEVERITY_LEVELS.map((level) => (
          <Chip
            key={level}
            label={String(level)}
            selected={severity === level}
            onPress={() => setSeverity(level)}
          />
        ))}
      </View>

      {severity === null && (
        <Text style={hintStyle}>Kaydetmek için bir şiddet seviyesi seç.</Text>
      )}

      <PrimaryButton
        title="Kaydet"
        loading={isLoading}
        disabled={!canSave}
        onPress={handleSave}
      />

      {submitStatus === 'success' && (
        <View style={[styles.banner, { backgroundColor: colors.successBg }]}>
          <Text style={[styles.bannerText, { color: colors.text }]}>
            Kaydedildi ✓
          </Text>
        </View>
      )}

      {submitStatus === 'error' && (
        <View style={[styles.banner, { backgroundColor: colors.errorBg }]}>
          <Text style={[styles.bannerText, { color: colors.text }]}>
            Sunucuya gönderilemedi. Kaydın telefonunda güvende.
          </Text>
          <PrimaryButton title="Tekrar Dene" onPress={handleRetry} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  label: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  hint: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  banner: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  bannerText: {
    textAlign: 'center',
    fontWeight: '600',
  },
});