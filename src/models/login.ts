import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';
import { router } from 'umi';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { GlobalApi, AccountApi } from '@/config/api';
import Request from '@/utils/http/request/index';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }: any, { call, put }: any) {
      return yield call(Request.post, AccountApi.login, null, payload);
    },
    *getCaptcha(_: any, { call, put }: any) {
      return yield call(Request.post, GlobalApi.captcha);
    },
    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
