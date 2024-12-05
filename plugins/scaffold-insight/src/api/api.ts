import {
  createApiRef,
  DiscoveryApi,
  FetchApi,
  IdentityApi,
} from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import queryString from 'qs';
import { ScaffolderTask } from '@backstage/plugin-scaffolder-react';

export const scaffolderAnalyticsApiRef =
  createApiRef<ScaffolderAnalyticsClient>({
    id: 'plugin.scaffolderanalytics.service',
  });

export class ScaffolderAnalyticsClient {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;
  private readonly identityApi?: IdentityApi;

  constructor(options: {
    discoveryApi: DiscoveryApi;
    fetchApi: FetchApi;
    identityApi?: IdentityApi;
  }) {
    this.discoveryApi = options.discoveryApi;
    this.fetchApi = options.fetchApi ?? { fetch };
    this.identityApi = options.identityApi;
  }

  async listTasks(options: {
    filterByOwnership: 'owned' | 'all' | 'user';
    username?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ tasks: ScaffolderTask[]; totalTasks?: number }> {
    if (!this.identityApi) {
      throw new Error(
        'IdentityApi is not available in the ScaffolderClient, please pass through the IdentityApi to the ScaffolderClient constructor in order to use the listTasks method',
      );
    }

    const baseUrl = await this.discoveryApi.getBaseUrl('scaffolder');

    let userRef: string | undefined;

    if (options.filterByOwnership === 'owned') {
      const { userEntityRef } = await this.identityApi.getBackstageIdentity();
      userRef = userEntityRef;
    } else if (options.filterByOwnership === 'user') {
      if (!options.username) {
        throw new Error(
          'Username must be provided when filterByOwnership is set to "user"',
        );
      }
      // Assuming the userEntityRef format is 'user:default/username'
      userRef = `user:default/${options.username}`;
    }
    // For 'all', userRef remains undefined

    const query = queryString.stringify({
      createdBy: userRef,
      limit: options.limit,
      offset: options.offset,
    });

    const response = await this.fetchApi.fetch(`${baseUrl}/v2/tasks?${query}`);
    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return await response.json();
  }

  async getTask(taskId: string): Promise<ScaffolderTask> {
    const baseUrl = await this.discoveryApi.getBaseUrl('scaffolder');
    const url = `${baseUrl}/v2/tasks/${encodeURIComponent(taskId)}`;

    const response = await this.fetchApi.fetch(url);
    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return await response.json();
  }
}
