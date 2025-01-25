import MyForm from "@/components/LoginForm";

export default async function AccountManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const mode = (await searchParams).mode || "signup";

  return (
    <section className="h-[calc(100vh-3rem)]">
      <div className="relative top-1/2 -translate-y-1/2">
        {mode && <MyForm mode={mode} />}
      </div>
    </section>
  );
}
