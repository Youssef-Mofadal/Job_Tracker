import { Contact } from "@/types/contact"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Building, User } from "lucide-react"

interface ContactCardProps {
    contact: Contact
}

export function ContactCard({ contact }: ContactCardProps) {
    return (
        <Card>
            <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {contact.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-semibold">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground">{contact.role}</p>
                        </div>
                    </div>
                    <Badge variant="outline">{contact.relationshipType}</Badge>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                        <Building className="mr-2 h-4 w-4" />
                        {contact.company}
                    </div>
                    {contact.email && (
                        <div className="flex items-center text-muted-foreground">
                            <Mail className="mr-2 h-4 w-4" />
                            <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                        </div>
                    )}
                    {contact.phone && (
                        <div className="flex items-center text-muted-foreground">
                            <Phone className="mr-2 h-4 w-4" />
                            {contact.phone}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
