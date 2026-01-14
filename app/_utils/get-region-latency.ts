export const getRegionLatency = async (url: string, region: string) => {
  const endpoint = "https://" + url + "/api/v1/getTipAccounts";
  const start = performance.now();
  await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTipAccounts",
      params: []
    })
  });
  const end = performance.now();
  return { region: region, latency: end - start };
};
