import styled from 'styled-components/native'
import Button from '~/components/Button'

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 30px;
  align-items: center;
  justify-content: center;
`
export const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`
export const Name = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
`
export const Time = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-top: 4px;
  opacity: 0.6;
`
export const SubmitButton = styled(Button)`
  align-self: stretch;
  margin-top: 20px;
`
