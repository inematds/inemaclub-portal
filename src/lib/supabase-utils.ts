/**
 * Busca todos os registros de uma query Supabase com paginação,
 * contornando o limite padrão de 1000 linhas.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchAllRows<T = any>(
  query: { range: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: any }> },
  pageSize = 1000
): Promise<T[]> {
  const all: T[] = []
  let from = 0
  while (true) {
    const { data, error } = await query.range(from, from + pageSize - 1)
    if (error || !data || data.length === 0) break
    all.push(...data)
    if (data.length < pageSize) break
    from += pageSize
  }
  return all
}
