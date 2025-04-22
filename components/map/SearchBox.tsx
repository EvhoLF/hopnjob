import React, { useState, useEffect, useRef, memo } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Keyboard,
  Pressable,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Suggestion = { id: string; name: string; lon: number; lat: number };
interface Props { onSelect: (lon: number, lat: number, label: string) => void }

const { width: W, height: H } = Dimensions.get('window');

const SearchBox = memo(({ onSelect }: Props) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchId = useRef(0);
  const timer = useRef<NodeJS.Timeout>();

  /* ───── дебаунс‑поиск ───── */
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    timer.current = setTimeout(async () => {
      setLoading(true);
      const current = ++fetchId.current;

      try {
        const url =
          `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(query)}&format=json&limit=7`;

        const res = await fetch(url, { headers: { 'User-Agent': 'HopnJob/1.0 (expo)' } });
        const data = await res.json() as any[];

        const uniq = new Map<string, Suggestion>();
        data.forEach(i => {
          if (!uniq.has(i.display_name))
            uniq.set(i.display_name, {
              id: i.place_id,
              name: i.display_name,
              lon: +i.lon,
              lat: +i.lat,
            });
        });

        if (current === fetchId.current) setSuggestions([...uniq.values()]);
      } catch (e) {
        console.warn('geocode error', e);
      } finally {
        if (current === fetchId.current) setLoading(false);
      }
    }, 400);

    return () => timer.current && clearTimeout(timer.current);
  }, [query]);

  const clear = () => {
    setSuggestions([]);
    setLoading(false);
    Keyboard.dismiss();
  };

  const closeClear = () => {
    clear();
    setQuery('');
  }

  /* ───── render ───── */
  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      {suggestions.length > 0 && (
        <Pressable style={styles.backdrop} onPress={clear} pointerEvents="auto" />
      )}

      <View style={styles.box} pointerEvents="auto">
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Город или район…"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onBlur={clear}
            multiline={false}
            numberOfLines={1}
          />

          {loading ? (
            <ActivityIndicator style={styles.icon} />
          ) : suggestions.length > 0 || query ? (
            <TouchableOpacity onPress={closeClear} style={styles.icon}>
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="search" size={20} color="#666" style={styles.icon} />
          )}
        </View>

        {!!suggestions.length && (
          <View style={{ zIndex: 2 }}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={suggestions}
              keyExtractor={i => i.id}
              style={styles.dropdown}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    clear();
                    setQuery(item.name);
                    onSelect(item.lon, item.lat, item.name);
                  }}
                  style={styles.suggestion}
                >
                  <Text numberOfLines={1}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
});

export default SearchBox;

/* ───── styles ───── */
const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,          // ← главный фикс
  },
  backdrop: {
    position: 'absolute',
    top: 0, left: 0,
    width: W, height: H,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  box: {
    position: 'absolute',
    top: 12, left: 12, right: 12,
    gap: 5,
    zIndex: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 6 },
  icon: { padding: 6 },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2,
    maxHeight: 200,
  },
  suggestion: { paddingVertical: 8, paddingHorizontal: 12 },
});
