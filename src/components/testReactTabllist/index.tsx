/**
 * @Author: Oceanxy
 * @Email: xieyang@zwlbs.com
 * @Description: react-tabllist .d.ts测试
 * @Date: 2020-11-13 周五 16:00:14
 * @LastModified: Oceanxy（xieyang@zwlbs.com）
 * @LastModifiedTime: 2020-11-13 周五 16:00:14
 */

import React from 'react';
import './index.scss';
import ReactTabllist from 'react-tabllist';

interface ReactTabllistProps {}

/**
 * 导航菜单组件
 */
const ReactTabllistComp = (props: ReactTabllistProps) => {
  return (
    <ReactTabllist
      data={[
        ['1', 2, 3],
        [1, 2, '3'],
        [
          {
            type: 'select',
            text: 'please choose：',
            value: '',
            data: '',
            className: '',
            callback: (data, cellData, event) => {},
            option: [
              {
                id: '1',
                label: 'item 1',
                value: 1
              }
            ]
          },
          {
            type: 'input',
            text: 'username:',
            placeholder: 'enter username',
            defaultValue: 'oceanxy', // This attribute is not a standard HTML tag attribute, but it is a property of the React element (the purpose is to set the default value of the text box). As you can see, `you can also use React's officially defined properties in object cells.`
            name: ''
          },
          {
            type: 'text',
            text: 'I am a normal text',
            callback: (data, cellData, event) => {}
          }
        ],
        {
          type: 'row',
          cells: ['row', 'row', 'row'],
          data: 'row.id',
          value: 'row.typeID',
          event: 'onClick',
          callback: (data, cellData, event) => {
            //
          },
          className: '',
          key: ''
        },
        [
          <div key="123">
            <span>123</span>
          </div>,
          <a key="222">123</a>,
          'zx'
        ],
        [
          1,
          [
            {
              type: 'checkbox',
              text: '1',
              name: 'd'
            },
            {
              type: 'checkbox',
              text: '2',
              name: 'd'
            }
          ],
          [
            {
              type: 'radio',
              text: '1',
              name: 's'
            },
            {
              type: 'radio',
              text: '2',
              name: 's'
            }
          ]
        ],
        [
          {
            type: 'button',
            value: 'click me',
            className: 'test-btn',
            data: '123',
            event: 'onClick',
            callback: (data) => console.log('hello react-tabllist', data), // hello react-tabllist, 123
            key: ''
          },
          {
            type: 'img',
            src: 'http://www.xieyangogo.cn/pic.png',
            alt: '',
            text: 'IMG description',
            className: 'test-img',
            key: '',
            value: ''
          },
          {
            type: 'link',
            text: 'I am a link, I use the href attribute',
            className: 'test-link',
            key: '',
            href: 'https://github.com/oceanxy/react-tabllist',
            value: ''
          }
        ],
        [
          {
            type: 'link',
            text: 'I am a link, I use event and callback to implement custom functions',
            className: 'test-link',
            key: '',
            data: {},
            event: 'onClick',
            callback: (data, cellData, event) => {},
            value: ''
          },
          {
            type: 'radio',
            name: 'group2',
            text: 'radio group 2-1',
            className: 'test-radio',
            callback: (data, cellData, event) => {},
            key: '',
            value: ''
          },
          {
            type: 'checkbox',
            name: 'checkbox1',
            text: 'checkbox',
            className: 'test-checkbox',
            callback: (data, cellData, event) => {},
            key: '',
            value: ''
          }
        ]
      ]}
      className="react-tabllist-container"
      property={{
        border: {
          borderWidth: 10
        },
        body: {
          cell: {
            style: {
              background: '#ededed'
            }
          }
        }
      }}
    />
  );
};

export default ReactTabllistComp;
