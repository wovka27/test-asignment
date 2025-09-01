import type { AxiosResponse } from 'axios';

export default abstract class BaseService<State> {
  public abstract formAction<T extends State>(
    state: T,
    payload: FormData
  ): Promise<AxiosResponse<T>>;
}
