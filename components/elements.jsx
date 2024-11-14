<CardContent className="space-y-4">
                    {lesson.elements.map((element, elementIndex) => (
                      <div key={elementIndex} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {element.type === 'reading' && <BookOpenCheck className="w-5 h-5 mr-2 text-primary" />}
                          {element.type === 'quiz' && <FileQuestion className="w-5 h-5 mr-2 text-primary" />}
                          {element.type === 'coding' && <Code className="w-5 h-5 mr-2 text-primary" />}
                          <span className="font-medium">{element.title}</span>
                        </div>
                        <Link href={`/${element.type}/${lesson.id}/${elementIndex}`} passHref>
                          <Button variant="outline" size="sm">
                            {element.completed ? 'Review' : 'Start'}
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </CardContent>