import CoursesIndex, { buildCoursesMetadata } from '@/components/CoursesIndex'

export const metadata = buildCoursesMetadata('es')

export default function CoursesPageEs() {
  return <CoursesIndex locale="es" />
}
