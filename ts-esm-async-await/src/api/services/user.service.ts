import { NotFoundError, BadRequestError } from '../../lib/errors/Errors';
import { UserDocument, UserModel as User } from '../models/user.model';


//---------------------- AUTHENTICATION (SIGNUP) -------------------------------//
export const signUpOneUserService = async (requestBody: UserDocument): Promise<UserDocument> => {
  const user = new User({
    username: requestBody.username,
    email: requestBody.email,
    password: requestBody.password,
  });
  const save = await user.save();
  return save;
};
//------------------------------------------------------------------------------------------//


export const getAllUsersService = async () => {
  const query = await User.find().exec();
  return query;
};

export const getOneUserService = async (paramsId: string) => {
  const query = await User.findById(paramsId).exec();
  if(!query){
    throw new NotFoundError('No record found for provided ID');
  }
  return query;
};

export const deleteOneUserService = async (paramsId: string) => {
  const query = await User.deleteOne({ _id: paramsId }).exec();
  if (query.deletedCount < 1){
    throw new NotFoundError('No record found for provided ID to be deleted')
  }
  return query;
}

export const updateOneUserPropertyValueService = async (paramsId: string, requestBody: { propName: string, value: string }[]) => {
  const query = await User.findById(paramsId).exec();
  if(!query){
    throw new NotFoundError('No record found for provided ID');
  }

  for (const ops of requestBody) {
    if(!(ops.propName in query)){
      throw new BadRequestError(`invalid property: ${ops.propName}`);
    }
    query[ops.propName as keyof UserDocument] = ops.value as never;
  }

  const updatedQuery = await query.save();
  return updatedQuery;
};

export const updateUserPropertyValuesService = async (paramsId: string, requestBody: UserDocument) => {
  const query = await User.findById(paramsId).exec();
  if(!query){
    throw new NotFoundError('No record found for provided ID');
  }

  query.username = requestBody.username;
  query.email = requestBody.email;
  query.password = requestBody.password;

  const updatedQuery = await query.save();
  return updatedQuery;
};


//--------------------------------------------------------------------------------------------------//
export const deleteAllUserService = async () => {
  const query = await User.deleteMany().exec();
  if (query.deletedCount < 1){
    throw new NotFoundError('No record found to be deleted')
  }
  return query;
}
//--------------------------------------------------------------------------------------------------//