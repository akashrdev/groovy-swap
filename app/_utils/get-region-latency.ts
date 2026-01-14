export const getRegionLatency = async (url: string, region: string) => {
  const endpoint = "https://" + url + "/api/v1/getTipAccounts";
  const start = performance.now();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    signal: controller.signal,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTipAccounts",
      params: []
    })
  });
  clearTimeout(timeout);
  const end = performance.now();
  return { region: region, latency: end - start };
};
