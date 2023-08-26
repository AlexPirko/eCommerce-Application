import ApiServices from '@lib/api/api-services';
const _apiServices = new ApiServices();

// Возможно не понадобится, пока нужна для проверки
export async function getProducts(): Promise<Response> {
  const result = await _apiServices.getProducts().catch((error) => error);
  return result.body.results;
}
