import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';

export const metadata = {
  title: 'Course Management | Belajar Indo',
}

export default function CourseManagement() {
  return (
    <Table>
      <TableCaption>A list of courses available.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Course ID</TableHead>
          <TableHead>Course Name</TableHead>
          <TableHead>Course Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">01</TableCell>
          <TableCell>Introduction</TableCell>
          <TableCell>Beginner BIPA 1</TableCell>
          <TableCell>Type the description here</TableCell>
          <TableCell>
            <Button variant="outline" size="icon">
              <Eye />
            </Button>
            <Button variant="default" size="icon">
              <Pencil />
            </Button>
            <Button variant="destructive" size="icon">
              <Trash2 />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}