import Link from "next/link";
import { DataTable } from "@components/Table/DataTable";
import {
  columns,
  User,
} from "@app/(protected)/dashboard/trips/Components/Columns";

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users"
  );
  const data = await res.json();
  return data;
}

export default async function page() {
  const data = await getUsers();

  return (
    <section className="px-4 sm:px-2">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">All trips</h1>
        <Link
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          href="/dashboard/trips/create"
        >
          Create new trip
        </Link>
      </div>
      {data && (
        <DataTable
          columns={columns}
          data={data}
          isPaginationEnabled={true}
          defaultPageSize={10}
        />
      )}
    </section>
  );
}
