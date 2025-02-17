import Image from 'next/image'
 
export default function Logo() {
  return (
    <Image
      src="/belajar-indo.png"
      width={160}
      height={46}
      alt="Belajar Indo logo"
    />
  )
}