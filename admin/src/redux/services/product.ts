import ApiRequest from '@/utils/ApiRequest';

export const getAll = async (page: any,pageSize:any) => {
    return ApiRequest.get('product',{params:{page,pageSize}})
}
export const createCustomButton = async (data:any) => {
    return ApiRequest.post('product',data);
}