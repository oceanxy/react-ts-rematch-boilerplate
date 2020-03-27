/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 搜索组件
 * @Date: 2020-01-14 11:38:22
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-03-27 17:11:36
 */

import Container from '@/components/UI/container';
import Icon, { iconName, IconSource, IconSourceHover } from '@/components/UI/icon';
import { IMonitor, IReqPayload, monitorTypeIcon, SearchCondition, SearchRequest } from '@/models/UI/search';
import Select from 'antd/es/select';
import React, { ButtonHTMLAttributes, useRef, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import './index.scss';

/**
 * 搜索接口
 */
export interface ISearch extends ButtonHTMLAttributes<any> {
  active?: boolean;
  isShowSearchResult?: boolean,
  updateMonitorData?: (reqPayload: IReqPayload) => void,
  data?: {
    monitorList: IMonitor[]
  }
}

/**
 * 搜索条件接口
 */
export interface ISearchCondition {
  name: string,
  icon: IconSource,
  iconHover: IconSourceHover,
  value: SearchCondition,
  placeholder: string
}

/**
 * 用于展示搜索结果的下拉列表styled组件
 * @type {StyledComponent<"ul", AnyIfEmpty<DefaultTheme>, {} & {className: string}, keyof {className: string}>}
 */
const StyledSearchDisplay: StyledComponent<any, ISearch> = styled.ul.attrs((props: ISearch) => {
  return {
    className: `${props.className} ${
      props.data?.monitorList.length ?
        (props.isShowSearchResult ? 'inter-plat-search-display-show' : 'inter-plat-search-display-hide') :
        ''
    }`
  };
})``;

/**
 * 搜索条件名称及图标配置
 * @type {({hover: IconSource; name: string; icon: IconSource; placeholder: string; value: string} | {hover: IconSource; name: string; icon: IconSource; placeholder: string; value: string} | {hover: IconSource; name: string; icon: IconSource; placeholder: string; value: string})[]}
 */
const searchConditions: ISearchCondition[] = [
  {
    name: iconName.ENTITY,
    icon: IconSource.ENTITY,
    iconHover: IconSourceHover.ENTITY_HOVER,
    value: SearchCondition.ENTITY,
    placeholder: '查找车辆/人员/物资'
  },
  {
    name: iconName.AREA,
    icon: IconSource.AREA,
    iconHover: IconSourceHover.AREA_HOVER,
    value: SearchCondition.AREA,
    placeholder: '查找区域'
  },
  {
    name: iconName.POSITION,
    icon: IconSource.POSITION,
    iconHover: IconSourceHover.POSITION_HOVER,
    value: SearchCondition.POSITION,
    placeholder: '查找位置'
  }
];

/**
 * 搜索组件
 */
const Search = (props: ISearch) => {
  const {updateMonitorData, data} = props;
  // 控制搜索结果的显示或隐藏
  const [isShowSearchResult, setIsShowSearchResult] = useState(false);
  // 搜索条件（监控对象、区域、位置）
  const [searchCondition, setSearchCondition] = useState(SearchCondition.ENTITY);
  // 搜索框Ref
  const searchBox = useRef<HTMLInputElement>(null);

  /**
   * 选择搜索方式
   * 按监控对象/位置/区域
   * @param value
   */
  const onChange = (value: any) => {
    // 根据当前选中的查询方式更改文本框的提示语
    for (let searchCondition of searchConditions) {
      if (searchCondition.value === value) {
        searchBox.current!.placeholder = searchCondition.placeholder;
        setSearchCondition(searchCondition.value);
        break;
      }
    }
  };

  /**
   * 点击搜索按钮搜索
   */
  const handleSearch = () => {
    const requestParam: SearchRequest = {
      simpleQueryParam: searchBox.current!.value,
      length: 100,
      supportMonitorType: -1
    };

    updateMonitorData?.({params: requestParam, condition: searchCondition});
    setIsShowSearchResult(!isShowSearchResult);
  };

  /**
   * 文本框回车搜索
   * @param {React.KeyboardEvent<HTMLDivElement>} e
   */
  const onEnterSearch = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const inputEl = (e.target as HTMLInputElement);
    if (e.keyCode === 13 && inputEl.value) {
      handleSearch();
    }
  };

  return (
    <Container className="inter-plat-search">
      <Container className="inter-plat-search-box">
        <Select
          defaultValue={searchConditions[0].value}
          className="inter-plat-select"
          dropdownClassName="inter-plat-dropdown"
          onChange={onChange}
        >
          {
            searchConditions.map((item, index) => (
              <Select.Option
                key={`inter-plat-select-option-${index}`}
                value={item.value}
                title={item.name}
              >
                <Icon icon={item.icon} iconHover={item.iconHover} />
              </Select.Option>
            ))
          }
        </Select>
        <input
          type="text"
          ref={searchBox}
          placeholder={searchConditions[0].placeholder}
          className="inter-plat-text"
          onKeyUp={onEnterSearch}
        />
        <button
          type="submit"
          onClick={handleSearch}
        />
      </Container>

      <StyledSearchDisplay
        {...props}
        isShowSearchResult={isShowSearchResult}
        className="inter-plat-search-display"
      >
        {
          data?.monitorList.map((item, index) => (
            <li className="inter-plat-search-display-item" key={`inter-plat-search-display-item-${index}`}>
              <Icon
                text={item.monitorName}
                icon={monitorTypeIcon[item.monitorType] as IconSource}
                iconHover={monitorTypeIcon[`${item.monitorType}_hover`] as IconSourceHover}
              />
            </li>
          ))
        }
      </StyledSearchDisplay>
    </Container>
  );
};

export default Search;
