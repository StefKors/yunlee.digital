export default function(doc) {
  if (doc.type === 'about') {
    return `/about`
  }

  if (doc.type === 'sounds') {
    return `/sounds`
  }

  if (doc.type === 'projects') {
    const type = doc?.data.types?.find(type => {
      return type?.projectoverview?.uid
    })

    return `/${type?.projectoverview?.uid}/${doc.data?.uid}`
  }

  if (doc.type === 'overview') {
    return `/${doc.uid}`
  }

  return '/'
}
