import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CATEGORY_OPTIONS,
  SYMPTOM_OPTIONS,
  TRIGGER_TAG_OPTIONS,
} from '../constants/options';
import { useTheme } from '../theme/ThemeProvider';
import type { LogEntry, Severity, SyncStatus } from '../types';
import { labelOf } from '../utils/labels';

const SEVERITY_COLORS: Record<Severity, string> = {
  1: '#c8e6c9',
  2: '#dcedc8',
  3: '#fff9c4',
  4: '#ffe0b2',
  5: '#ffcdd2',
};

const SYNC_INFO: Record<SyncStatus, { label: string; color: string }> = {
  pending: { label: 'Gönderim bekliyor', color: '#f9a825' },
  synced: { label: 'Gönderildi', color: '#43a047' },
  failed: { label: 'Gönderilemedi', color: '#e53935' },
};

interface EntryCardProps {
  entry: LogEntry;
  onRetry?: () => void;
  retrying?: boolean;
}

export default function EntryCard({
  entry,
  onRetry,
  retrying = false,
}: EntryCardProps) {
  const { colors } = useTheme();

  const date = new Date(entry.createdAt).toLocaleString('tr-TR', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
  const tags = entry.triggerTags
    .map((tag) => labelOf(TRIGGER_TAG_OPTIONS, tag))
    .join(', ');
  const symptoms = entry.symptoms
    .map((symptom) => labelOf(SYMPTOM_OPTIONS, symptom))
    .join(', ');
  const sync = SYNC_INFO[entry.syncStatus];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.mealName, { color: colors.text }]}>
          {entry.mealName}
        </Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: SEVERITY_COLORS[entry.severity] },
          ]}
        >
          <Text style={styles.badgeText}>Şiddet {entry.severity}/5</Text>
        </View>
      </View>
      <Text style={[styles.meta, { color: colors.textMuted }]}>
        {date} · {labelOf(CATEGORY_OPTIONS, entry.category)}
      </Text>
      {tags !== '' && (
        <Text style={{ color: colors.text }}>Tetikleyici: {tags}</Text>
      )}
      {symptoms !== '' && (
        <Text style={{ color: colors.text }}>Semptom: {symptoms}</Text>
      )}

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <View style={styles.syncRow}>
          <View style={[styles.dot, { backgroundColor: sync.color }]} />
          <Text style={[styles.syncText, { color: colors.textMuted }]}>
            {sync.label}
          </Text>
        </View>
        {entry.syncStatus !== 'synced' && onRetry && (
          <Pressable
            onPress={onRetry}
            disabled={retrying}
            style={({ pressed }) => [
              styles.retryButton,
              { borderColor: colors.primary },
              pressed && styles.retryPressed,
            ]}
          >
            {retrying ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text style={[styles.retryText, { color: colors.primary }]}>
                Tekrar Gönder
              </Text>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
  },
  meta: {
    marginTop: 4,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  syncText: {
    fontSize: 13,
  },
  retryButton: {
    minWidth: 110,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  retryPressed: {
    opacity: 0.7,
  },
  retryText: {
    fontWeight: '600',
    fontSize: 13,
  },
});