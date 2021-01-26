# frozen_string_literal: true
module ImageHelpers
  module_function

  ASSET_PROXY_BASE = ENV.fetch(
    "ASSET_PROXY_BASE",
    "https://assets.innovazione.gov.it/"
  )

  def favicon_json_path(path, escape = '\/')
    image_path(path).gsub(/\//, escape)
  end

  # attributes = {class: "", id: "", data: {role: {}, title: {}}}
  def icon(name, attributes = {})
    default_attributes = {role: "icon"}
    default_attributes.merge!(attributes.except(:role))
    if attributes.key?(:class)
      default_attributes[:class] += " icon-svg--#{name}"
    else
      default_attributes[:class] ||= "icon-svg--#{name}"
    end

    content_tag(:svg, default_attributes) do
      content_tag(:use, "", "xlink:href" => "#icons-#{name}")
    end
  end
  alias_method :i, :icon

  def proxy_link_to(*args, &block)
    assign_asset_proxy(link_to(*args, &block))
  end

  def proxy_image_tag(path, params={})
    assign_asset_proxy(image_tag(path, params))
  end

  def proxy_dato_meta_tags(item)
    assign_asset_proxy(dato_meta_tags(item))
  end

  def assign_asset_proxy(text)
    text.gsub(
      %r(https://www.datocms-assets.com/\d+/),
      ASSET_PROXY_BASE
    )
  end
end
