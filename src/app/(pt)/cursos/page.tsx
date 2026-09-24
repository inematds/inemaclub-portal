import CoursesIndex, { buildCoursesMetadata } from '@/components/CoursesIndex'

export const metadata = buildCoursesMetadata('pt')

export default function CoursesPage() {
  return <CoursesIndex locale="pt" />
}
