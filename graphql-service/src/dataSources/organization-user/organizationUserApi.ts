import { RESTDataSource } from "@apollo/datasource-rest";
import { SERVER_URL } from "../../utils/consts";
import { IResponse } from "../../utils/interfaces/common";

export default class OrganizationUserApi extends RESTDataSource {
  override baseURL = SERVER_URL.USER_SERVICE;
  private user: object | null;

  constructor(user: object | null) {
    super();
    this.user = user;
  }

  async create(doc: object): Promise<IResponse> {
    return await this.post(`organization-user/create`, {
      body: { doc, user: this.user },
    });
  }

  async remove(doc: object): Promise<IResponse> {
    return await this.post(`organization-user/remove`, {
      body: { doc, user: this.user },
    });
  }

  async getList(doc: object): Promise<IResponse> {
    return await this.post(`organization-user/list`, {
      body: { doc, user: this.user },
    });
  }
}