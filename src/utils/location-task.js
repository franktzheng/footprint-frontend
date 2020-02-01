export default function LocationTask({ data: { locations }, error }) {
  if (error) {
    // check `error.message` for more details.
    return
  }
  console.log('Received new locations', locations)
}
