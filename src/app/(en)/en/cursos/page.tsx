import CoursesIndex, { buildCoursesMetadata } from '@/components/CoursesIndex'

export const metadata = buildCoursesMetadata('en')

export default function CoursesPageEn() {
  return <CoursesIndex locale="en" />
}
