import ApiRequest from '@/utils/ApiRequest';

export const getAll = async () => {
    return ApiRequest.get('users')
}

export const viewUser = async(id:any)=>{
    return ApiRequest.get(`users/${id}`);
}
export const deleteUser = async(id:any)=>{
    return ApiRequest.delete(`users/${id}`);
 }
export const getAllPagi = async(page: any, pageSize: any)=>{
   return ApiRequest.get('users/pagi', {
      params: {
          page: page,
          pageSize: pageSize,
      }
  })

}
export const searchUser = async(q:any,page: any, pageSize: any)=>{
   return ApiRequest.get('users/search', {
      params: {
          q: q,
          page: page,
          pageSize: pageSize,
      }
  });
}
 export const updateUser= async(dto:any)=>{
    return ApiRequest.put(`users/${dto?.id}`,dto);
 }

 export const createUser = async(data:any)=>{
    return ApiRequest.post('users',data);
 }
 export const sendMail = async(email:any,subject:any,message:any)=>{
   return ApiRequest.post('email',{email: email,subject: subject,message: message});
}