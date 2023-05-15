import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import React, { Component } from 'react';
import { history } from '@tarojs/router'

class detail extends Component {
  unblock=()=>{}
  componentDidShow() {
    console.log('componentDidShow')
    //假如我返回的是相同的路由，这里每次都会调用 ，以前的版本这些是不调用的
    //  window.history.pushState(null, null, document.URL);
    //   window.addEventListener('popstate', this.webGoBack);
    this.unblock = history.block((tx) => {
      // Navigation was blocked! Let's show a confirmation dialog
      // so the user can decide if they actually want to navigate
      // away and discard changes they've made in the current page.
      let url = tx.location.pathname
      if (window.confirm(`Are you sure you want to go to ${url}?`)) {
        // Unblock the navigation.
        this.unblock ()

        // Retry the transition.
        tx.retry()
      }
    })
  }
  componentWillUnmount(){
    this.unblock 
  }
  webGoBack = () => {
    Taro.showModal({
      title: '',
      content: '风险测评未完成或过期将导致无法交易，确认放弃吗？',
      confirmText: '继续测评',
      confirmColor: '#FF7622',
      cancelText: '放弃测评',
      cancelColor: '#999999',
      success: (res) => {
        if (res.cancel) {
          window.removeEventListener('popstate', this.webGoBack);
          Taro.navigateBack({ delta: 1 });
        } else {
          window.history.pushState(null, null, document.URL);
        }
      },
    });
  };
  render() {
    return (
      <div>我是详情页1111</div>
    )
  }

}
export default detail;