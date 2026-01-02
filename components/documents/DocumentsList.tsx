import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Trash2, File } from "lucide-react"
import { Button } from "@/components/ui/button"

const MOCK_DOCUMENTS = [
    { id: "1", name: "Resume_v1.pdf", type: "Resume", date: "2024-01-10", size: "1.2 MB" },
    { id: "2", name: "Cover_Letter_Google.docx", type: "Cover Letter", date: "2024-01-20", size: "45 KB" },
    { id: "3", name: "Portfolio_Design.pdf", type: "Portfolio", date: "2023-12-05", size: "5.5 MB" },
    { id: "4", name: "References.pdf", type: "Other", date: "2024-01-15", size: "800 KB" },
]

export function DocumentsList() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_DOCUMENTS.map((doc) => (
                <Card key={doc.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg-primary/10 rounded-md">
                                <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-base font-medium leading-none">{doc.name}</CardTitle>
                                <CardDescription>{doc.date} • {doc.size}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between mt-4">
                            <Badge variant="secondary">{doc.type}</Badge>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Card className="flex flex-col items-center justify-center border-dashed cursor-pointer hover:bg-muted/50 transition-colors h-[180px]">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <div className="p-4 bg-muted rounded-full">
                        <File className="h-6 w-6" />
                    </div>
                    <span className="font-medium">Upload New Document</span>
                </div>
            </Card>
        </div>
    )
}
