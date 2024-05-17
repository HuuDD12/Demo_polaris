import ApiRequest from '@/utils/ApiRequest';

export const getListUserSetting = async (q: any, page: any, pageSize: any) => {
    return ApiRequest.get('userSetting', {
        params: {
            q: q,
            page: page,
            pageSize: pageSize,
        }
    })

}