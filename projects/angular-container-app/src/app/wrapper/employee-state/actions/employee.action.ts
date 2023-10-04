import { Employee } from '../models/Employee';

export class AddEmployee {
  static readonly type = '[Employee] Add';

  constructor(public payload: Employee) {}
}

export class RemoveEmployee {
  static readonly type = '[Employee] Remove';

  constructor(public payload: Employee) {}
}
