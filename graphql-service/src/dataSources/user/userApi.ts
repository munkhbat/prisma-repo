import { RESTDataSource } from "@apollo/datasource-rest";
import { SERVER_URL } from "../../utils/consts";
import { IResponse } from "../../utils/interfaces/common";

export default class UserApi extends RESTDataSource {
  override baseURL = SERVER_URL.USER_SERVICE;
  private user: object | null;

  constructor(user: object | null) {
    super();
    this.user = user;
  }

  async register(doc: object): Promise<IResponse> {
    return await this.post(`user/register`, {
      body: { doc, user: this.user },
    });
  }

  async login(doc: object): Promise<IResponse> {
    return await this.post(`user/login`, {
      body: { doc, user: this.user },
    });
  }

  async getList(doc: object): Promise<IResponse> {
    return await this.post(`user/list`, {
      body: { doc, user: this.user },
    });
  }
}
