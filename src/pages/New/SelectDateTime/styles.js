import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.SafeAreaView`
  flex: 1;
`
export const HourList = styled.FlatList.attrs({
  numColumns: 2,
  contentContainerStyle: { padding: 30 },
  showsVerticalScrollIndicator: false
})``

export const Hour = styled(RectButton)`
  display: flex;
  flex: 1;
  background: #fff;
  border-radius: 4px;
  width: 80px;
  padding: 10px;
  margin: 0 10px 15px;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.enabled ? 1.0 : 0.4)};
`
export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`
