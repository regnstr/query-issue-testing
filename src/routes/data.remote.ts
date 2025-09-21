import { query, form } from "$app/server";
import { z } from 'zod';

let data: Array<{myValue: unknown; id: number}> = [
  {myValue: undefined, id: 0},
  {myValue: undefined, id: 1},
  {myValue: undefined, id: 2},
];

export const getData = query(() => {
  return data
})

export const getDummy = query(() => {
  return 'asd'
})

export const setData = form(z.object({
  index: z.coerce.number<string>(),
  value: z.string()
}), (parsed) => {
  data[parsed.index] = {myValue: parsed.value, id: parsed.index}
})
