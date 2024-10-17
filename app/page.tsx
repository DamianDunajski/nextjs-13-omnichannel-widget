import dynamic from 'next/dynamic';

const WidgetWithNoSSR = dynamic(
  () => import('./widget'),
  { ssr: false, loading: () => <p>Loading...</p>, }
)

export default function Home() {
  return (
    <WidgetWithNoSSR/>
  )
}
