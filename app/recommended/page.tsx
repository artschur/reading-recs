export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <section>
                <h2>Most Recommended</h2>
                {/* Add your most recommended books here */}
            </section>
            <section>
                <h2>More Recommendations</h2>
                {/* Add your more recommendations here */}
            </section>
            {children}
        </div>
    );
}