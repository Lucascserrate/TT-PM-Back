export enum TaskError {
  NOT_FOUND = 'Task not found',
  ALREADY_EXISTS = 'Task already exists',
  SOMETHING_WENT_WRONG_CREATING = 'Something went wrong while creating a task',
  SOMETHING_WENT_WRONG_FETCHING = 'Something went wrong while fetching tasks',
  SOMETHING_WENT_WRONG_FETCHING_ONE = 'Something went wrong while fetching a task',
  SOMETHING_WENT_WRONG_DELETING = 'Something went wrong while deleting a task',
  SOMETHING_WENT_WRONG_UPDATING = 'Something went wrong while updating a task',
}
