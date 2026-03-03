'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FileUpIcon, ImageIcon, X } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LoadingOverlay from './LoadingOverlay'

const VOICES = {
  Male: [
    { id: 'dave', name: 'Dave', description: 'Authoritative' },
    { id: 'daniel', name: 'Daniel', description: 'Smooth' },
    { id: 'chris', name: 'Chris', description: 'Dynamic' },
  ],
  Female: [
    { id: 'rachel', name: 'Rachel', description: 'Warm' },
    { id: 'sarah', name: 'Sarah', description: 'Professional' },
  ],
}

const formSchema = z.object({
  pdfFile: z.any().refine((file) => file instanceof File, {
    message: 'PDF file is required',
  }),
  coverImage: z.any().optional(),
  title: z
    .string()
    .min(1, 'Title is required')
    .min(2, 'Title must be at least 2 characters'),
  author: z
    .string()
    .min(1, 'Author name is required')
    .min(2, 'Author name must be at least 2 characters'),
  voice: z.string().min(1, 'Please select a voice'),
})

type FormValues = z.infer<typeof formSchema>

const UploadForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pdfFileName, setPdfFileName] = useState<string | null>(null)
  const [coverFileName, setCoverFileName] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      voice: '',
      pdfFile: undefined,
      coverImage: undefined,
    },
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true)
    try {
      // Handle form submission here
      console.log('Form values:', values)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPdfFileName(file.name)
      form.setValue('pdfFile', file, { shouldValidate: true })
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFileName(file.name)
      form.setValue('coverImage', file)
    }
  }

  const removePdf = () => {
    setPdfFileName(null)
    form.clearErrors('pdfFile')
    form.setValue('pdfFile', undefined)
  }

  const removeCover = () => {
    setCoverFileName(null)
    form.setValue('coverImage', undefined)
  }

  return (
    <>
      <div className="new-book-wrapper">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* PDF File Upload */}
            <FormField
              control={form.control}
              name="pdfFile"
              render={() => (
                <FormItem>
                  <FormLabel className="form-label">PDF File Upload</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="upload-dropzone">
                        {pdfFileName ? (
                          <div className="flex items-center justify-between w-full px-3 sm:px-4 gap-2">
                            <span className="text-lg font-medium text-[#663820] truncate">
                              {pdfFileName}
                            </span>
                            <button
                              type="button"
                              onClick={removePdf}
                              className="upload-dropzone-remove shrink-0"
                              aria-label="Remove PDF"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <FileUpIcon className="upload-dropzone-icon" />
                            <span className="upload-dropzone-text">Click to upload PDF</span>
                            <span className="upload-dropzone-hint">PDF file (max 50MB)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image Upload */}
            <FormField
              control={form.control}
              name="coverImage"
              render={() => (
                <FormItem>
                  <FormLabel className="form-label">Cover Image Upload</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="upload-dropzone">
                        {coverFileName ? (
                          <div className="flex items-center justify-between w-full px-3 sm:px-4 gap-2">
                            <span className="text-lg font-medium text-[#663820] truncate">
                              {coverFileName}
                            </span>
                            <button
                              type="button"
                              onClick={removeCover}
                              className="upload-dropzone-remove shrink-0"
                              aria-label="Remove Cover"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <ImageIcon className="upload-dropzone-icon" />
                            <span className="upload-dropzone-text">
                              Click to upload cover image
                            </span>
                            <span className="upload-dropzone-hint">
                              Leave empty to auto-generate from PDF
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: Rich Dad Poor Dad"
                      className="form-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author Input */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Author Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: Robert Kiyosaki"
                      className="form-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Voice Selector */}
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                  <FormControl>
                    <div className="space-y-6">
                      {Object.entries(VOICES).map(([gender, voices]) => (
                        <div key={gender}>
                          <h4 className="text-sm font-semibold text-[#3d485e] mb-3">
                            {gender} Voices
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {voices.map((voice) => (
                              <label
                                key={voice.id}
                                className={`voice-selector-option ${
                                  field.value === voice.id
                                    ? 'voice-selector-option-selected'
                                    : 'voice-selector-option-default'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="voice"
                                  value={voice.id}
                                  checked={field.value === voice.id}
                                  onChange={(e) => field.onChange(e.target.value)}
                                  className="hidden"
                                  aria-label={`Select ${voice.name} voice`}
                                />
                                <div className="flex-1 text-left">
                                  <div className="font-semibold text-[#222c37]">
                                    {voice.name}
                                  </div>
                                  <div className="text-sm text-[#3d485e]">{voice.description}</div>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="form-btn disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Begin Synthesis'}
            </button>
          </form>
        </Form>
      </div>

      {isLoading && <LoadingOverlay />}
    </>
  )
}

export default UploadForm
