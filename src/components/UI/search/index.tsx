/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: 搜索组件
 * @Date: 2020-01-14 11:38:22
 * @LastModified: Oceanxy(xieyang@zwlbs.com)
 * @LastModifiedTime: 2020-04-09 周四 15:36:14
 */

import Container from '@/components/UI/containerComp';
import Icon, { iconName, IconSource, IconSourceHover } from '@/components/UI/iconComp';
import SearchPanel from '@/components/UI/search/searchPanel';
import { SearchCondition } from '@/models/UI/search';
import Select from 'antd/es/select';
import React, { ButtonHTMLAttributes, ChangeEvent, useRef, useState } from 'react';
import './index.scss';

/**
 * 搜索接口
 */
export interface ISearchProps extends ButtonHTMLAttributes<any> {
  searchState: ISearchState & SearchResultData
  active: boolean
  isShowSearchResult: boolean
  fetchData: ISearchModel['effects']['fetchData']
  setState: ISearchModel['effects']['setState']
  clearData: ISearchModel['effects']['clearData']
}

/**
 * 搜索条件接口
 */
export interface ISearchCondition {
  name: string;
  icon: IconSource;
  iconHover: IconSourceHover;
  value: SearchCondition;
  placeholder: string;
}

/**
 * 搜索条件名称及图标配置
 * @type {ISearchCondition[]}
 */
const searchConditions: ISearchCondition[] = [
  {
    name: iconName.ENTITY,
    icon: IconSource.ENTITY,
    iconHover: IconSourceHover.ENTITY,
    value: SearchCondition.ENTITY,
    placeholder: '查找车辆/人员/物资'
  },
  {
    name: iconName.AREA,
    icon: IconSource.AREA,
    iconHover: IconSourceHover.AREA,
    value: SearchCondition.AREA,
    placeholder: '查找区域'
  },
  {
    name: iconName.POSITION,
    icon: IconSource.POSITION,
    iconHover: IconSourceHover.POSITION,
    value: SearchCondition.POSITION,
    placeholder: '查找位置'
  }
];

/**
 * 搜索组件
 */
const Search = (props: Partial<ISearchProps>) => {
  const {searchState, fetchData, setState, clearData} = props;
  const {searchCondition, searchKeyword} = searchState!;
  // 控制搜索结果面板的显示或隐藏
  const [isShowSearchResult, setIsShowSearchResult] = useState(false);
  // 搜索框Ref
  const searchBox = useRef<HTMLInputElement>(null);

  /**
   * 选择搜索方式
   * 按监控对象/位置/区域
   * @param value
   */
  const onChange = (value: SearchCondition) => {
    for (let sc of searchConditions) {
      if (sc.value === value) {
        // 根据当前选中的查询方式更改文本框的提示语
        searchBox.current!.placeholder = sc.placeholder;
        // 清空搜索关键词、设置新的搜索条件（按对象、区域或位置搜索）
        setState!({searchKeyword: '', searchCondition: value});
        // 变更搜索条件后，清空搜索数据缓存
        clearData!();
        // 设置是否显示搜索结果面板
        setIsShowSearchResult(false);
        break;
      }
    }
  };

  /**
   * 点击搜索按钮搜索
   */
  const handleSearch = () => {
    if (searchKeyword) {
      const keyword = searchBox.current!.value;

      if (searchCondition === SearchCondition.ENTITY) {
        const requestParam: IEntityRequest = {
          simpleQueryParam: keyword,
          length: 100,
          supportMonitorType: -1
        };

        fetchData?.({params: requestParam, condition: searchCondition!});
      } else if (searchCondition === SearchCondition.AREA) {
        const requestParam: IFenceRequest = {
          queryParam: keyword
        };

        fetchData?.({params: requestParam, condition: searchCondition!});
      }

      setIsShowSearchResult(true);
    }
  };

  /**
   * 文本框回车搜索
   * @param {React.KeyboardEvent<HTMLDivElement>} e
   */
  const onEnterSearch = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const inputEl = e.target as HTMLInputElement;
    if (e.keyCode === 13 && inputEl.value) {
      handleSearch();
    }
  };

  /**
   * 文本框输入事件
   * @param {React.KeyboardEvent<HTMLInputElement>} e
   */
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const beSetValue = e.currentTarget.value;
    setState!({searchKeyword: beSetValue});

    // 根据输入框的值内容，设置是否显示搜索结果面板
    if (searchCondition === SearchCondition.POSITION) {
      if (beSetValue) {
        setIsShowSearchResult(true);
      } else {
        setIsShowSearchResult(false);
      }
    } else {
      if (!beSetValue || beSetValue !== searchKeyword) {
        setIsShowSearchResult(false);
      }
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
          {searchConditions.map((item, index) => (
            <Select.Option key={`inter-plat-select-option-${index}`} value={item.value} title={item.name}>
              <Icon icon={item.icon} iconHover={item.iconHover} />
            </Select.Option>
          ))}
        </Select>
        <input
          id="searchBox"
          type="text"
          ref={searchBox}
          placeholder={searchConditions[0].placeholder}
          className="inter-plat-search-input"
          onKeyUp={onEnterSearch}
          autoComplete="off"
          value={searchKeyword}
          onChange={onInputChange}
        />
        <button className="inter-plat-search-button" type="submit" onClick={handleSearch} />
      </Container>
      <SearchPanel
        searchState={searchState!}
        isShow={isShowSearchResult}
        setIsShowSearchResult={setIsShowSearchResult}
      />
    </Container>
  );
};

export default Search;
