/* eslint-disable react/react-in-jsx-scope */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Center Authentication Box
    <div
      className="
        flex
        items-center
        justify-center
        h-full"
    >
      {children}
    </div>
  );
}
