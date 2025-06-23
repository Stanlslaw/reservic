/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserDto {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  phone_number?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface CreateUserDto {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  phone_number?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UpdateUserDto {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  phone_number?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface ServiceDto {
  id: number;
  providerId: number;
  title: string;
  photo_url: string[];
  duration: number;
  start_time: number;
  end_time: number;
  category: string;
  days_of_week: string[];
  description: string;
  price: number;
  status: "active" | "deleted" | "stopped";
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UserFavoritesWithService {
  /** @example 1 */
  id: number;
  /** @example 2 */
  userId: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  service: ServiceDto;
}

export interface CreateUserFavoriteDto {
  /** @example 5 */
  serviceId: number;
  /** @example 2 */
  userId: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface DeleteUserFavoriteDto {
  /** @example 1 */
  id: number;
}

export interface CreateServiceReviewDto {
  text: string;
  value: number;
  serviceId: number;
  userId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ServiceReviewDto {
  id: number;
  text: string;
  value: number;
  serviceId: number;
  userId: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ProviderDto {
  /** @example 1 */
  id: number;
  /** @example "John Doe" */
  name?: string;
  /** @example "johndoe" */
  username: string;
  /** @example "+1234567890" */
  phone_number?: string;
  /** @example "123 Main St" */
  address?: string;
  /** @example "https://example.com/photo.jpg" */
  picture_url?: string;
  /** @example "Experienced massage therapist" */
  description?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface CreateProviderDto {
  /** @example 1 */
  id: number;
  /** @example "John Doe" */
  name?: string;
  /** @example "johndoe" */
  username: string;
  /** @example "+1234567890" */
  phone_number?: string;
  /** @example "123 Main St" */
  address?: string;
  /** @example "https://example.com/photo.jpg" */
  picture_url?: string;
  /** @example "Experienced massage therapist" */
  description?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UpdateProviderDto {
  /** @example 1 */
  id?: number;
  /** @example "John Doe" */
  name?: string;
  /** @example "johndoe" */
  username?: string;
  /** @example "+1234567890" */
  phone_number?: string;
  /** @example "123 Main St" */
  address?: string;
  /** @example "https://example.com/photo.jpg" */
  picture_url?: string;
  /** @example "Experienced massage therapist" */
  description?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface ServiceWithProviderAndReviewsDto {
  id: number;
  title: string;
  photo_url: string[];
  duration: number;
  start_time: number;
  end_time: number;
  category: string;
  days_of_week: string[];
  description: string;
  price: number;
  status: "active" | "deleted" | "stopped";
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  provider: ProviderDto;
  reviews: ServiceReviewDto[];
  serviceReviewMark: number;
}

export interface DeleteServiceDto {
  id: number;
  providerId: number;
}

export interface BookingDto {
  /** @example 1 */
  id: number;
  status: "active" | "declined";
  /**
   * Unix timestamp (seconds)
   * @example 1717286400
   */
  appointment_date: number;
  /** @example 5 */
  serviceId: number;
  /** @example 12 */
  userId: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface GetBookingsDto {
  bookings: string[];
}

export interface GetAvailableSlotsDto {
  appointment_dates: string[];
}

export interface CreateBookingDto {
  status: "active" | "declined";
  /**
   * Unix timestamp (seconds)
   * @example 1717286400
   */
  appointment_date: number;
  /** @example 5 */
  serviceId: number;
  /** @example 12 */
  userId: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UpdateBookingDto {
  /** @example 1 */
  id: number;
  /**
   * Unix timestamp (seconds)
   * @example 1717286400
   */
  appointment_date: number;
}

export interface DeleteBookingDto {
  /** @example 1 */
  id: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title API Docs
 * @version 1.0
 * @contact
 *
 * Reservic bots api
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  healthCheck = {
    /**
     * No description
     *
     * @tags App
     * @name AppControllerTest
     * @summary Check if app is healthy
     * @request GET:/health-check
     */
    appControllerTest: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/health-check`,
        method: "GET",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetUser
     * @request GET:/users/{userId}
     * @secure
     */
    usersControllerGetUser: (userId: number, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/users/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreateUser
     * @request POST:/users/create
     * @secure
     */
    usersControllerCreateUser: (
      data: CreateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<UserDto, any>({
        path: `/users/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdateUser
     * @request POST:/users/update
     * @secure
     */
    usersControllerUpdateUser: (
      data: UpdateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<UserDto, any>({
        path: `/users/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  favorites = {
    /**
     * No description
     *
     * @tags Favorites
     * @name FavoritesControllerGetFavorites
     * @request GET:/favorites/{userId}
     * @secure
     */
    favoritesControllerGetFavorites: (
      userId: number,
      params: RequestParams = {},
    ) =>
      this.request<UserFavoritesWithService[], any>({
        path: `/favorites/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Favorites
     * @name FavoritesControllerAddFavorite
     * @request POST:/favorites/add
     * @secure
     */
    favoritesControllerAddFavorite: (
      data: CreateUserFavoriteDto,
      params: RequestParams = {},
    ) =>
      this.request<UserFavoritesWithService[], any>({
        path: `/favorites/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Favorites
     * @name FavoritesControllerRemoveFavorite
     * @request POST:/favorites/delete
     * @secure
     */
    favoritesControllerRemoveFavorite: (
      data: DeleteUserFavoriteDto,
      params: RequestParams = {},
    ) =>
      this.request<UserFavoritesWithService[], any>({
        path: `/favorites/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  reviews = {
    /**
     * No description
     *
     * @tags Reviews
     * @name ReviewsControllerCreateServiceReview
     * @request POST:/reviews/create
     * @secure
     */
    reviewsControllerCreateServiceReview: (
      data: CreateServiceReviewDto,
      params: RequestParams = {},
    ) =>
      this.request<ServiceReviewDto, any>({
        path: `/reviews/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  provider = {
    /**
     * No description
     *
     * @tags Providers
     * @name ProvidersControllerGetProvider
     * @request GET:/provider/{id}
     * @secure
     */
    providersControllerGetProvider: (id: number, params: RequestParams = {}) =>
      this.request<ProviderDto, any>({
        path: `/provider/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Providers
     * @name ProvidersControllerCreateProvider
     * @request POST:/provider/create
     * @secure
     */
    providersControllerCreateProvider: (
      data: CreateProviderDto,
      params: RequestParams = {},
    ) =>
      this.request<CreateProviderDto, any>({
        path: `/provider/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Providers
     * @name ProvidersControllerUpdateProvider
     * @request POST:/provider/update
     * @secure
     */
    providersControllerUpdateProvider: (
      data: UpdateProviderDto,
      params: RequestParams = {},
    ) =>
      this.request<ProviderDto, any>({
        path: `/provider/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  services = {
    /**
     * No description
     *
     * @tags Services
     * @name ServicesControllerGetServices
     * @request GET:/services
     * @secure
     */
    servicesControllerGetServices: (
      query?: {
        providerId?: number;
        name?: string;
        maxPrice?: number;
        minPrice?: number;
        category?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ServiceDto[], any>({
        path: `/services`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Services
     * @name ServicesControllerGetService
     * @request GET:/services/{serviceId}
     * @secure
     */
    servicesControllerGetService: (
      serviceId: number,
      params: RequestParams = {},
    ) =>
      this.request<ServiceWithProviderAndReviewsDto, any>({
        path: `/services/${serviceId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Services
     * @name ServicesControllerCreateService
     * @request POST:/services/create
     * @secure
     */
    servicesControllerCreateService: (params: RequestParams = {}) =>
      this.request<ServiceDto, any>({
        path: `/services/create`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Services
     * @name ServicesControllerUpdateService
     * @request POST:/services/update
     * @secure
     */
    servicesControllerUpdateService: (params: RequestParams = {}) =>
      this.request<ServiceDto, any>({
        path: `/services/update`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Services
     * @name ServicesControllerDeleteService
     * @request POST:/services/delete
     * @secure
     */
    servicesControllerDeleteService: (
      data: DeleteServiceDto,
      params: RequestParams = {},
    ) =>
      this.request<ServiceDto, any>({
        path: `/services/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  bookings = {
    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerGetBooking
     * @request GET:/bookings/{bookingId}
     * @secure
     */
    bookingsControllerGetBooking: (
      bookingId: string,
      params: RequestParams = {},
    ) =>
      this.request<BookingDto, any>({
        path: `/bookings/${bookingId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerGetBookings
     * @request GET:/bookings/bookings
     * @secure
     */
    bookingsControllerGetBookings: (
      query?: {
        /**
         * Фильтр по ID пользователя
         * @example 1
         */
        userId?: any;
        /**
         * Фильтр по ID провайдера
         * @example 2
         */
        providerId?: any;
        /**
         * Получить только последние бронирования
         * @example true
         */
        isLast?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetBookingsDto, any>({
        path: `/bookings/bookings`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerGetAvailableSlots
     * @request GET:/bookings/getAvailableSlots
     * @secure
     */
    bookingsControllerGetAvailableSlots: (
      query: {
        serviceId: number;
        /** @format date-time */
        date: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetAvailableSlotsDto, any>({
        path: `/bookings/getAvailableSlots`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerCreateBooking
     * @request POST:/bookings/create
     * @secure
     */
    bookingsControllerCreateBooking: (
      data: CreateBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<BookingDto, any>({
        path: `/bookings/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerUpdateBooking
     * @request POST:/bookings/update
     * @secure
     */
    bookingsControllerUpdateBooking: (
      data: UpdateBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<BookingDto, any>({
        path: `/bookings/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookings
     * @name BookingsControllerDeleteBooking
     * @request POST:/bookings/delete
     * @secure
     */
    bookingsControllerDeleteBooking: (
      data: DeleteBookingDto,
      params: RequestParams = {},
    ) =>
      this.request<BookingDto, any>({
        path: `/bookings/delete`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
