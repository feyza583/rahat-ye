import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EntryCard from '../components/EntryCard';
import { postLog } from '../services/api';
import { useLogStore } from '../store/useLogStore';
import { useTheme } from '../theme/ThemeProvider';
import type { LogEntry } from '../types';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const entries = useLogStore((state) => state.entries);
  const updateSyncStatus = useLogStore((state) => state.updateSyncStatus);
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const sortedEntries = [...entries].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

  const handleRetry = async (entry: LogEntry) => {
    setRetryingId(entry.id);
    try {
      await postLog(entry);
      updateSyncStatus(entry.id, 'synced');
    } catch {
      updateSyncStatus(entry.id, 'failed');
    } finally {
      setRetryingId(null);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Geçmiş</Text>
      <FlatList
        data={sortedEntries}
        extraData={retryingId}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EntryCard
            entry={item}
            retrying={retryingId === item.id}
            onRetry={() => handleRetry(item)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.textMuted }]}>
            Henüz kayıt yok. "Kayıt Ekle" sekmesinden ilk öğününü ekle.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
  },
});