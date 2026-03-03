import UploadForm from "@/components/UploadForm";

const page = () => {
  return (
    <main className="wrappper container">
      <div className="mx-auto max-w-180 space-y-10 ">
        <section className="flex flex-col gap-5">
          <h1 className="page-title-xl">Add A New Book</h1>
          <p className="subtitle">
            Upload a PDF to generate our interaction interview questions and
            answers.
          </p>
          <UploadForm />
        </section>
      </div>
    </main>
  );
};

export default page;
