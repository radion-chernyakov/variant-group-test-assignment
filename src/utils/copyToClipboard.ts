import reportError from './reportError'

export default function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(reportError)
}
