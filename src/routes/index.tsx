import { createFileRoute } from '@tanstack/react-router'
import PostPage from '../features/posts'

export const Route = createFileRoute('/')({ component: PostPage })
