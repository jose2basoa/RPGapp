import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";

export const supabase =
  createClient(
    "https://uyyxcuixujbndjaxkkgk.supabase.co",
    "sb_publishable_J9oZnJj8-PNxtpie7n8ZQw_zoBwsc-Y"
  );