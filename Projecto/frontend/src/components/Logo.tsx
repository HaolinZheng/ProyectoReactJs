import logoImage from '../assets/logo.png'

type LogoProps = {
  size?: number | string;
}

function Logo(props: LogoProps) {

  const size = props.size || 100;
  
  return (
    <img className='mr-auto' src={logoImage} width={size} height={size}></img>
  )
}
export default Logo;