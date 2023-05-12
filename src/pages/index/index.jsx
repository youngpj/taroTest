import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })
  const toDetail=()=>{
    Taro.navigateTo({
      url: '/pages/detail/index'
    })
  }

  return (
    <View className='index'>
      <Text onClick={toDetail}>Hello world!</Text>
    </View>
  )
}
