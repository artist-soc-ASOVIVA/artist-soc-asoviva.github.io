/* ============================================================
   microcms.js
   microCMS API クライアント（各機能ページから共通利用）
   ============================================================ */
const MICROCMS = (() => {
  "use strict";

  // TODO: 実際のエンドポイント・APIキーに置き換える
  const ENDPOINT = "https://your-service.microcms.io/api/v1";
  const API_KEY = "YOUR_API_KEY";

  async function request(path, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${ENDPOINT}/${path}?${query}` : `${ENDPOINT}/${path}`;

    const res = await fetch(url, {
      headers: { "X-API-KEY": API_KEY },
    });

    if (!res.ok) {
      throw new Error(`microCMS request failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  /** 一覧取得。contents 配列を返す */
  async function fetchList(path, params = {}) {
    const data = await request(path, { limit: "100", ...params });
    return data.contents ?? [];
  }

  /** 詳細取得。content オブジェクトを返す */
  async function fetchDetail(path, id, params = {}) {
    return request(`${path}/${id}`, params);
  }

  return { fetchList, fetchDetail, request };
})();
