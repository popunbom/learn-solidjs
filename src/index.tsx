/* @refresh reload */
import { render } from 'solid-js/web'
import "solid-devtools"

import App from '@/pages/App'

import './index.css'

const root = document.getElementById('root')

render(() => <App />, root!)
