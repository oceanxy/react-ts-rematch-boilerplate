/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 搜索组件
 * @Date: 2020-01-14 11:38:22
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-01-14 11:38:22
 */

import React, { ButtonHTMLAttributes } from 'react';
import './index.scss';

interface ISearch extends ButtonHTMLAttributes<any> {
  active?: boolean;
}

/**
 * 搜索组件
 */
const Search = (props: ISearch) => {
  return (
    <label className="inter-plat-search">
      <input type="text" placeholder="搜索" />
      <button type="submit" />
    </label>
  );
};

export default Search;
