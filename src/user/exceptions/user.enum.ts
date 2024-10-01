export enum UserError {
  NOT_FOUND = 'User not found',
  ALREADY_EXISTS = 'User already exists',
  SOMETHING_WENT_WRONG = 'Something went wrong while fetching all users',
  SOMETHING_WENT_WRONG_FETCHING = 'Something went wrong while fetching a user',
  SOMETHING_WENT_WRONG_CREATING = 'Something went wrong while creating a user',
  SOMETHING_WENT_WRONG_UPDATING = 'Something went wrong while updating a user',
  SOMETHING_WENT_WRONG_DELETING = 'Something went wrong while deleting a user',
}
